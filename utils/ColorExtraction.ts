import { ColorListType } from '@/components/ColorList';
import { suggestionColorType } from '@/pages/add-cloth';

// RGB 타입 정의
export interface RGB {
  r: number;
  g: number;
  b: number;
}

// 클러스터 타입 정의
export interface Cluster {
  centroid: RGB;
  pixels: RGB[];
}

// k-평균 군집화 함수
export async function kMeansClustering(
  pixels: RGB[],
  k: number
): Promise<Cluster[]> {
  let centroids = initializeCentroids(pixels, k);
  let clusters: Cluster[] = [];

  for (let i = 0; i < 10; i++) {
    clusters = assignPixelsToClusters(pixels, centroids);
    const newCentroids = updateCentroids(clusters);

    // 수렴 조건: 중심점이 거의 변하지 않는 경우 반복 종료
    if (centroids.every((c, idx) => colorDistance(c, newCentroids[idx]) < 1)) {
      break;
    }
    centroids = newCentroids;
  }

  return clusters;
}

// k-means++ 초기화 함수
export function initializeCentroids(pixels: RGB[], k: number): RGB[] {
  const centroids: RGB[] = [];
  const firstCentroid = pixels[Math.floor(Math.random() * pixels.length)];
  centroids.push(firstCentroid);

  while (centroids.length < k) {
    const distances = pixels.map((pixel) =>
      Math.min(...centroids.map((centroid) => colorDistance(pixel, centroid)))
    );
    const totalDistance = distances.reduce((a, b) => a + b, 0);
    const randomThreshold = Math.random() * totalDistance;
    let sumDistance = 0;

    for (let i = 0; i < distances.length; i++) {
      sumDistance += distances[i];
      if (sumDistance >= randomThreshold) {
        centroids.push(pixels[i]);
        break;
      }
    }
  }

  return centroids;
}

// 픽셀을 클러스터에 할당하는 함수
export function assignPixelsToClusters(
  pixels: RGB[],
  centroids: RGB[]
): Cluster[] {
  const clusters: Cluster[] = centroids.map((centroid) => ({
    centroid,
    pixels: [],
  }));

  for (let pixel of pixels) {
    let minDistance = Number.MAX_VALUE;
    let closestCentroidIndex = -1;

    for (let i = 0; i < centroids.length; i++) {
      const distance = colorDistance(pixel, centroids[i]);
      if (distance < minDistance) {
        minDistance = distance;
        closestCentroidIndex = i;
      }
    }

    clusters[closestCentroidIndex].pixels.push(pixel);
  }

  return clusters;
}

// 클러스터 중심점 업데이트 함수
export function updateCentroids(clusters: Cluster[]): RGB[] {
  return clusters.map((cluster) => {
    const sum = cluster.pixels.reduce(
      (acc: RGB, pixel: RGB) => {
        acc.r += pixel.r;
        acc.g += pixel.g;
        acc.b += pixel.b;
        return acc;
      },
      { r: 0, g: 0, b: 0 }
    );

    const count = cluster.pixels.length;
    return { r: sum.r / count, g: sum.g / count, b: sum.b / count };
  });
}

// 16진수 색상 코드를 RGB로 변환하는 함수
export function hexToRgb(hex: string): RGB {
  let bigint = parseInt(hex.slice(1), 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

// 두 색상 간의 거리를 계산하는 함수
export function colorDistance(color1: RGB, color2: RGB): number {
  return Math.sqrt(
    Math.pow(color1.r - color2.r, 2) +
      Math.pow(color1.g - color2.g, 2) +
      Math.pow(color1.b - color2.b, 2)
  );
}

// 가장 가까운 색상을 찾는 함수
export function findClosestColor(
  r: number,
  g: number,
  b: number,
  colorList: ColorListType
): suggestionColorType | null {
  if (!colorList || colorList.length === 0) return null;

  let minDistance = Number.MAX_VALUE;
  let closestColorName: suggestionColorType | null = null;

  const targetColor = { r, g, b };

  for (let color of colorList) {
    let colorRgb = hexToRgb(color.colorCode);
    let distance = colorDistance(targetColor, colorRgb);

    if (distance < minDistance) {
      minDistance = distance;
      closestColorName = {
        id: color.id,
        name: color.name,
        colorCode: color.colorCode,
      };
    }
  }

  return closestColorName;
}
