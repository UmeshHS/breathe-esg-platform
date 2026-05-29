from rest_framework.views import APIView
from rest_framework.response import Response

from emissions.models import EmissionRecord
from audit.models import AuditLog

class ApproveRecordView(APIView):

    def post(self, request, record_id):

        record = EmissionRecord.objects.get(
            id=record_id
        )

        record.status = "approved"
        record.save()

        AuditLog.objects.create(
            record=record,
            action="approved",
            changed_by="analyst",
            notes="Record approved"
        )

        return Response({
            "message": "Record approved"
        })
    
class RejectRecordView(APIView):

    def post(self, request, record_id):

        record = EmissionRecord.objects.get(
            id=record_id
        )

        record.status = "rejected"
        record.save()

        AuditLog.objects.create(
            record=record,
            action="rejected",
            changed_by="analyst",
            notes="Record rejected"
        )

        return Response({
            "message": "Record rejected"
        })