from django.db import models
from django.contrib.auth.models import User

class GroceryItem(models.Model):
    name = models.CharField(max_length=200)
    quantity = models.PositiveIntegerField(default=1)
    department = models.CharField(max_length=100, blank=True)
    completed = models.BooleanField(default=False)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    created_date = models.DateTimeField(auto_now_add=True)
    completed_date = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['completed', '-created_date']