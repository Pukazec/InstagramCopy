export interface PictureDto {
  id: string;
  sepia: number | null;
  blur: number | null;
  authorName: string;
  uploadedAt: Date;
  description: string | null;
  hashTags: string[];
  imageData: string;
}

export interface PictureDetailDto extends PictureDto {
  width: number;
  height: number;
}
