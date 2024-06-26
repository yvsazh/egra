# Generated by Django 2.2.4 on 2024-01-30 10:42

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
from django.utils.timezone import utc


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30, verbose_name='Name of project')),
                ('data', models.TextField(verbose_name='Data of project')),
                ('preview', models.ImageField(default='/previews/default-preview.jpg', upload_to='previews/', verbose_name='Preview of project')),
                ('creation_date', models.DateField(default=datetime.datetime(2024, 1, 30, 10, 42, 12, 764508, tzinfo=utc), verbose_name='Creation date')),
                ('user', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='+', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
