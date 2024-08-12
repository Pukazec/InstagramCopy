using InstagramCopy.Data;
using InstagramCopy.Models.DbModels;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace InstagramCopy.Controllers
{
    public class PictureController(MongoDbService context) : BaseController
    {

        [HttpGet]
        public async Task<IEnumerable<Picture>> Get()
        {
            var pictures = await context.Pictures.Find(FilterDefinition<Picture>.Empty).ToListAsync();
            return pictures;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Picture?>> GetById(Guid id)
        {
            var filter = Builders<Picture>.Filter.Eq(x => x.Id, id);
            var picture = await context.Pictures.Find(filter).FirstOrDefaultAsync();
            return picture is not null ? Ok(picture) : NotFound();
        }

        [HttpPost]
        public async Task<ActionResult> Create(PictureCommand command)
        {
            var picture = new Picture
            {
                Id = command.Id,
                Tags = command.Tags,
                Description = command.Description,
                ImageData = Convert.FromBase64String(command.ImageData),
            };

            await context.Pictures.InsertOneAsync(picture);
            return CreatedAtAction(nameof(GetById), new { id = picture.Id }, picture);
        }

        [HttpPut]
        public async Task<ActionResult> Update(Picture picture)
        {
            var filter = Builders<Picture>.Filter.Eq(x => x.Id, picture.Id);
            await context.Pictures.ReplaceOneAsync(filter, picture);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            var filter = Builders<Picture>.Filter.Eq(x => x.Id, id);
            await context.Pictures.DeleteOneAsync(filter);
            return Ok();
        }
    }
}
