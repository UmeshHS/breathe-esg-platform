from django.urls import path

from .views import (
    ApproveRecordView,
    RejectRecordView
)

urlpatterns = [

    path(
        "approve/<int:record_id>/",
        ApproveRecordView.as_view(),
        name="approve-record"
    ),

    path(
        "reject/<int:record_id>/",
        RejectRecordView.as_view(),
        name="reject-record"
    ),
]