from django.urls import path
from .views import (
    GroceryListView,
    GroceryCreateView,
    GroceryUpdateView,
    GroceryDeleteView,
    toggle_complete,
    HomeView
)

urlpatterns = [
    path('', HomeView.as_view(), name='home'),
    path('list/', GroceryListView.as_view(), name='grocery-list'),
    path('create/', GroceryCreateView.as_view(), name='grocery-create'),
    path('update/<int:pk>/', GroceryUpdateView.as_view(), name='grocery-update'),
    path('delete/<int:pk>/', GroceryDeleteView.as_view(), name='grocery-delete'),
    path('toggle/<int:pk>/', toggle_complete, name='grocery-toggle'),
]
