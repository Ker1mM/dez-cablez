using DezCablez.Data;
using DezCablez.Data.Models;
using DezCablez.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DezCablez.Services
{
    public class ImageService : IImageService
    {

        private readonly DezCablezDBContext _context;
        public ImageService(DezCablezDBContext context)
        {
            this._context = context;
        }

        public async Task<Image> AddImageAsync(Image img)
        {
            await this._context.Images.AddAsync(img);

            await this._context.SaveChangesAsync();

            return img;
        }
    }
}
