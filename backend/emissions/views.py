from rest_framework.generics import ListAPIView

from .models import EmissionRecord
from .serializers import EmissionRecordSerializer
from .models import EmissionRecord
from .serializers import EmissionRecordSerializer


class SuspiciousRecordListView(ListAPIView):
    serializer_class = EmissionRecordSerializer

    def get_queryset(self):
        return EmissionRecord.objects.filter(
            suspicious=True
        ).order_by("-id")

class EmissionRecordListView(ListAPIView):
    queryset = EmissionRecord.objects.all().order_by("-id")
    serializer_class = EmissionRecordSerializer