using InstagramCopy.Models.DbModels;
using InstagramCopy.Models.Identity;
using InstagramCopy.Services.UserServices.PictureEntity.Filters;
using Microsoft.AspNetCore.Identity;
using MongoDB.Driver;

namespace InstagramCopy.Data.Factory
{
    public class MongoPictureFactory
    {
        private readonly IMongoCollection<Picture> _pictures;
        private readonly UserManager<ApplicationUser> _userManager;

        public MongoPictureFactory(
            IMongoDatabase database,
            UserManager<ApplicationUser> userManager)
        {
            _pictures = database.GetCollection<Picture>("pictures");
            _userManager = userManager;
        }

        public IList<Picture> GetFilteredPictures(PictureFilter filter)
        {
            var query = _pictures.AsQueryable();

            if (filter.AuthorName != null)
            {
                var author = _userManager.Users.FirstOrDefault(u => u.UserName == filter.AuthorName);
                if (author != null)
                {
                    query = (MongoDB.Driver.Linq.IMongoQueryable<Picture>)query.Where(p => p.AuthorId.Equals(author.Id));
                }
            }

            if (filter.From.HasValue)
            {
                query = (MongoDB.Driver.Linq.IMongoQueryable<Picture>)query.Where(p => p.UploadedAt >= filter.From.Value);
            }

            if (filter.To.HasValue)
            {
                query = (MongoDB.Driver.Linq.IMongoQueryable<Picture>)query.Where(p => p.UploadedAt <= filter.To.Value);
            }

            if (filter.Hashtags.Any())
            {
                query = (MongoDB.Driver.Linq.IMongoQueryable<Picture>)query.Where(p => filter.Hashtags.All(ht => p.HashTags.Contains(ht)));
            }

            return query.ToList();
        }

        public Picture? GetPictureById(Guid id)
        {
            var picture = _pictures.Find(p => p.Id == id).FirstOrDefault();
            return picture;
        }

        public Guid CreatePicture(Picture picture)
        {
            _pictures.InsertOne(picture);
            return picture.Id;
        }

        public Guid UpdatePicture(Picture picture)
        {
            _pictures.ReplaceOne(p => p.Id == picture.Id, picture);
            return picture.Id;
        }

        public bool DeletePicture(Guid id)
        {
            var result = _pictures.DeleteOne(p => p.Id == id);
            return result.DeletedCount > 0;
        }
    }
}
