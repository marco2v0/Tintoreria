# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import Nota, Status

# Register your models here.

admin.site.register(Nota)
admin.site.register(Status)