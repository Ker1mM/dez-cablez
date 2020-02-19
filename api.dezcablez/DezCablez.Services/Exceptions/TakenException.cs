using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DezCablez.Web.Exceptions
{
    public class TakenException : Exception
    {

        public TakenException()
        {
        }

        public TakenException(string message, string entity)
            : base(message)
        {
            base.Source = entity;
        }
    }
}
