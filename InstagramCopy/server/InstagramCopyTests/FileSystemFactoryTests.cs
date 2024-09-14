using InstagramCopy.Data.Factory;
using InstagramCopy.Models.DbModels;
using InstagramCopy.Services.UserServices.PictureEntity.Filters;
using Xunit;

namespace InstagramCopyTests
{
    public class FileSystemPictureFactoryTests : IDisposable
    {
        private readonly string _testDirectory;
        private readonly FileSystemPictureFactory _factory;

        public FileSystemPictureFactoryTests()
        {
            _testDirectory = Path.Combine(Path.GetTempPath(), Guid.NewGuid().ToString());
            _factory = new FileSystemPictureFactory(_testDirectory);
        }

        public void Dispose()
        {
            // Clean up the temporary directory after tests
            if (Directory.Exists(_testDirectory))
            {
                Directory.Delete(_testDirectory, true);
            }
        }

        [Fact]
        public void GetFilteredPictures_ByAuthorName_ReturnsCorrectPictures()
        {
            var picture = new Picture { Id = Guid.NewGuid(), AuthorName = "author1", UploadedAt = DateTime.UtcNow, HashTags = ["tag1"] };
            _factory.CreatePicture(picture);

            var filter = new PictureFilter { AuthorName = "author1" };
            var result = _factory.GetFilteredPictures(filter);

            Assert.Single(result);
            Assert.Equal("author1", result.First().AuthorName);
        }

        [Fact]
        public void GetFilteredPictures_ByDateRange_ReturnsCorrectPictures()
        {
            var picture1 = new Picture { Id = Guid.NewGuid(), AuthorName = "author2", UploadedAt = DateTime.UtcNow.AddDays(-1), HashTags = ["tag2"] };
            var picture2 = new Picture { Id = Guid.NewGuid(), AuthorName = "author2", UploadedAt = DateTime.UtcNow, HashTags = ["tag2"] };
            _factory.CreatePicture(picture1);
            _factory.CreatePicture(picture2);

            var filter = new PictureFilter { From = DateTime.UtcNow.AddDays(-2), To = DateTime.UtcNow.AddDays(-1) };
            var result = _factory.GetFilteredPictures(filter);

            Assert.Single(result);
            Assert.Equal(picture1.Id, result.First().Id);
        }

        [Fact]
        public void GetPictureById_ReturnsCorrectPicture()
        {
            var picture = new Picture { Id = Guid.NewGuid(), AuthorName = "author3", UploadedAt = DateTime.UtcNow, HashTags = ["tag3"] };
            _factory.CreatePicture(picture);

            var result = _factory.GetPictureById(picture.Id);

            Assert.NotNull(result);
            Assert.Equal(picture.Id, result?.Id);
        }

        [Fact]
        public void GetPictureById_ReturnsNullForNonExistingId()
        {
            var result = _factory.GetPictureById(Guid.NewGuid());

            Assert.Null(result);
        }

        [Fact]
        public void CreatePicture_CreatesFileSuccessfully()
        {
            var picture = new Picture { Id = Guid.NewGuid(), AuthorName = "author4", UploadedAt = DateTime.UtcNow, HashTags = ["tag4"] };
            var id = _factory.CreatePicture(picture);

            var filePath = Path.Combine(_testDirectory, $"{id}.json");
            Assert.True(File.Exists(filePath));
        }

        [Fact]
        public void UpdatePicture_UpdatesExistingFile()
        {
            var picture = new Picture { Id = Guid.NewGuid(), AuthorName = "author5", UploadedAt = DateTime.UtcNow, HashTags = ["tag5"] };
            _factory.CreatePicture(picture);

            picture.AuthorName = "updatedAuthor";
            _factory.UpdatePicture(picture);

            var updatedPicture = _factory.GetPictureById(picture.Id);
            Assert.NotNull(updatedPicture);
            Assert.Equal("updatedAuthor", updatedPicture?.AuthorName);
        }

        [Fact]
        public void DeletePicture_DeletesFileSuccessfully()
        {
            var picture = new Picture { Id = Guid.NewGuid(), AuthorName = "author6", UploadedAt = DateTime.UtcNow, HashTags = ["tag6"] };
            _factory.CreatePicture(picture);

            var result = _factory.DeletePicture(picture.Id);

            Assert.True(result);
            var deletedPicture = _factory.GetPictureById(picture.Id);
            Assert.Null(deletedPicture);
        }

        [Fact]
        public void DeletePicture_ReturnsFalseForNonExistingFile()
        {
            var result = _factory.DeletePicture(Guid.NewGuid());

            Assert.False(result);
        }
    }
}
