﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DezCablez.Web.Exceptions
{
    public class EntityNotFoundException : Exception
    {

        public EntityNotFoundException()
        {
        }

        public EntityNotFoundException(string message, string entity)
            : base(message)
        {
            base.Source = entity;
        }
    }
}
