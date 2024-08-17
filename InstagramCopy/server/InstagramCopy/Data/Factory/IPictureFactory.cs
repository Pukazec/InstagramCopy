using InstagramCopy.Models.DbModels;
using InstagramCopy.Services.UserServices.PictureEntity.Filters;

namespace InstagramCopy.Data.Factory
{
    public interface IPictureFactory
    {
        public IList<Picture> GetFilteredPictures(PictureFilter filter);
        public Picture? GetPictureById(Guid id);
        public Guid CreatePicture(Picture picture);
        public Guid UpdatePicture(Picture command);
        public bool DeletePicture(Guid id);
    }
}
