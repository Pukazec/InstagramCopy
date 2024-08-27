using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Data.Models.DbModels
{
    [Table(nameof(InstagramLog), Schema = "App")]
    public class InstagramLog
    {
        public int Id { get; set; }

        public string? UserName { get; set; }

        public DateTime OccurredAt { get; set; }

        public string Operation { get; set; } = string.Empty;

        public string? RequestQuery { get; set; }
    }
}
