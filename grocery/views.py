from django.views.generic import ListView, CreateView, UpdateView, DeleteView, TemplateView
from django.urls import reverse_lazy
from django.shortcuts import redirect
from .models import GroceryItem
from django.utils import timezone

class HomeView(TemplateView):
    template_name = 'grocery/home.html'

class GroceryListView(ListView):
    model = GroceryItem
    template_name = 'grocery/grocery_list.html'
    context_object_name = 'items'

    def get_queryset(self):
        return GroceryItem.objects.all()

class GroceryCreateView(CreateView):
    model = GroceryItem
    template_name = 'grocery/grocery_form.html'
    fields = ['name', 'quantity', 'department']
    success_url = reverse_lazy('grocery-list')

    def form_valid(self, form):
        return super().form_valid(form)

class GroceryUpdateView(UpdateView):
    model = GroceryItem
    template_name = 'grocery/grocery_form.html'
    fields = ['name', 'quantity', 'department']
    success_url = reverse_lazy('grocery-list')

class GroceryDeleteView(DeleteView):
    model = GroceryItem
    template_name = 'grocery/grocery_confirm_delete.html'
    success_url = reverse_lazy('grocery-list')

def toggle_complete(request, pk):
    item = GroceryItem.objects.get(pk=pk)
    if item.completed:
        item.completed = False
        item.completed_date = None
    else:
        item.completed = True
        item.completed_date = timezone.now()
    item.save()
    return redirect('grocery-list')