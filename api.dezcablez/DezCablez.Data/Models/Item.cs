using DezCablez.Data.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DezCablez.Data.Models
{
    public class Item
    {
        public Item()
        {
            this.Pictures = new HashSet<Image>();
        }

        [Key]
        [StringLength(50, MinimumLength = 10)]
        public string Id { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 3)]
        public string Name { get; set; }

        [Required]
        [StringLength(220, MinimumLength = 10)]
        public string Description { get; set; }

        public ItemType Type { get; set; }

        [Column(TypeName = "decimal(22, 2)")]
        [Range(typeof(decimal), "0", "79228162514264337593543950335")]
        public decimal Price { get; set; }

        [Range(0, 10000)]
        public int Stock { get; set; }

        public string Thumbnail { get; set; }

        public virtual ICollection<Image> Pictures { get; set; }

        public string Extra1Name { get; set; }
        public string Extra1Value { get; set; }

        public string Extra2Name { get; set; }
        public string Extra2Value { get; set; }

        public string Extra3Name { get; set; }
        public string Extra3Value { get; set; }

        public string Extra4Name { get; set; }
        public string Extra4Value { get; set; }

        public string Extra5Name { get; set; }
        public string Extra5Value { get; set; }

        public string Extra6Name { get; set; }
        public string Extra6Value { get; set; }

        public string Extra7Name { get; set; }
        public string Extra7Value { get; set; }
    }
}
