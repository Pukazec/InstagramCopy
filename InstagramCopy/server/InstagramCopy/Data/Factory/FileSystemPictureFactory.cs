using InstagramCopy.Models.DbModels;
using InstagramCopy.Services.UserServices.PictureEntity.Filters;
using System.Text.Json;

namespace InstagramCopy.Data.Factory
{
    public class FileSystemPictureFactory : IPictureFactory
    {
        private readonly string _pictureDirectory;

        public FileSystemPictureFactory(
            string pictureDirectory)
        {
            _pictureDirectory = pictureDirectory;
            CreateDirectoryIfNotExists(_pictureDirectory);
        }

        public IList<Picture> GetFilteredPictures(PictureFilter filter)
        {
            var files = Directory.GetFiles(_pictureDirectory, "*.json");
            var pictures = files.Select(file =>
            {
                var json = File.ReadAllText(file);
                return JsonSerializer.Deserialize<Picture>(json);
            }).ToList();

            if (filter.AuthorName != null)
            {
                pictures = pictures.Where(p => p.AuthorName.Equals(filter.AuthorName)).ToList();
            }

            if (filter.From.HasValue)
            {
                pictures = pictures.Where(p => p.UploadedAt >= filter.From.Value).ToList();
            }

            if (filter.To.HasValue)
            {
                pictures = pictures.Where(p => p.UploadedAt <= filter.To.Value).ToList();
            }

            if (filter.Hashtags.Any())
            {
                pictures = pictures.Where(p => filter.Hashtags.All(ht => p.HashTags.Contains(ht))).ToList();
            }

            return pictures.ToList();
        }

        public Picture? GetPictureById(Guid id)
        {
            var filePath = Path.Combine(_pictureDirectory, $"{id}.json");
            if (!File.Exists(filePath)) return null;

            var json = File.ReadAllText(filePath);
            return JsonSerializer.Deserialize<Picture>(json);
        }

        public Guid CreatePicture(Picture picture)
        {
            var filePath = Path.Combine(_pictureDirectory, $"{picture.Id}.json");
            File.WriteAllText(filePath, JsonSerializer.Serialize(picture));

            return picture.Id;
        }

        public Guid UpdatePicture(Picture picture)
        {
            var filePath = Path.Combine(_pictureDirectory, $"{picture.Id}.json");
            if (!File.Exists(filePath)) return Guid.Empty;

            File.WriteAllText(filePath, JsonSerializer.Serialize(picture));

            return picture.Id;
        }

        public bool DeletePicture(Guid id)
        {
            var filePath = Path.Combine(_pictureDirectory, $"{id}.json");
            if (File.Exists(filePath))
            {
                File.Delete(filePath);
                return true;
            }
            return false;
        }

        private void CreateDirectoryIfNotExists(string directoryPath)
        {
            if (!Directory.Exists(directoryPath))
            {
                Directory.CreateDirectory(directoryPath);
            }
        }
    }
}
