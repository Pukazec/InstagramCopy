namespace InstagramCopy.Data.Factory
{
    public class PictureFactoryOptions
    {
        public const string SectionName = "PictureFactory";

        public FactoryType SelectedFactory { get; set; }
        public string RootFileSystemFolder { get; set; } = "D:\\InstagramCopy";
    }

    public enum FactoryType
    {
        FileSystem = 0,
        MongoDb = 1,
    }
}
