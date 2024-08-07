using InstagramCopy.Models.DbModels;
using MongoDB.Driver;

namespace InstagramCopy.Data
{
    public class MongoDbService
    {
        private readonly IMongoDatabase _database;

        public MongoDbService(IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("MongoDB");
            var databaseName = configuration.GetConnectionString("DatabaseName");

            var client = new MongoClient(connectionString);
            _database = client.GetDatabase(databaseName);
        }

        public IMongoCollection<Picture> Pictures => _database.GetCollection<Picture>("PicturesList");
    }
}
