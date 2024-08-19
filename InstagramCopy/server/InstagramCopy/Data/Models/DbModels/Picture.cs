using InstagramCopy.Models.Identity;
using System.ComponentModel.DataAnnotations;

namespace InstagramCopy.Models.DbModels
{
    public class Picture
    {
        public Guid Id { get; set; }

        public int Width { get; set; }

        public int Height { get; set; }

        public int? Sepia { get; set; }

        public double? Blur { get; set; }

        public Guid AuthorId { get; set; }

        public ApplicationUser? Author { get; set; }

        public DateTime UploadedAt { get; set; }

        [MaxLength(255)]
        public string? Description { get; set; }

        public IList<string> HashTags { get; set; } = [];

        public byte[] ImageData { get; set; } = [];
    }
}
