using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DezCablez.Data.Models
{
    public class Image
    {
        public Image()
        {

        }

        public int Id { get; set; }

        [Required]
        public string ItemId { get; set; }

        [ForeignKey(nameof(ItemId))]
        public Item Item { get; set; }

        [Required]
        public string ImgURL { get; set; }

    }
}
