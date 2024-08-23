using InstagramCopy.Models.DbModels;
using InstagramCopy.Services.UserServices.PictureEntity.Filters;
using MongoDB.Driver;

namespace InstagramCopy.Data.Factory
{
    public class MongoPictureFactory : IPictureFactory
    {
        private readonly IMongoCollection<Picture> _pictures;

        public MongoPictureFactory(
            MongoDbService database)
        {
            _pictures = database.Pictures;
        }

        public IList<Picture> GetFilteredPictures(PictureFilter filter)
        {
            var query = _pictures.AsQueryable();

            if (filter.AuthorName != null)
            {
                query = (MongoDB.Driver.Linq.IMongoQueryable<Picture>)query.Where(p => p.AuthorName.Equals(filter.AuthorName));
            }

            if (filter.From.HasValue)
            {
                query = (MongoDB.Driver.Linq.IMongoQueryable<Picture>)query.Where(p => p.UploadedAt >= filter.From.Value);
            }

            if (filter.To.HasValue)
            {
                query = (MongoDB.Driver.Linq.IMongoQueryable<Picture>)query.Where(p => p.UploadedAt <= filter.To.Value);
            }

            if (filter.HashTags.Any())
            {
                query = (MongoDB.Driver.Linq.IMongoQueryable<Picture>)query.Where(p => filter.HashTags.All(ht => p.HashTags.Contains(ht)));
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
