using System;
using System.Collections.Generic;
using System.Text;

namespace DezCablez.Services.Exceptions
{
    public class NotFoundException : Exception
    {
        public NotFoundException()
        {

        }

        public NotFoundException(string message, string entity)
            :base(message)
        {
            base.Source = entity;
        }
    }
}
