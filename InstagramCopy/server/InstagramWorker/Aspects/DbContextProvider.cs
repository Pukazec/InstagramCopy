using InstagramCopy.Data;

namespace InstagramWorker.Aspects
{
    public static class DbContextProvider
    {
        public static ApplicationDbContext DbContext { get; set; }
    }
}
