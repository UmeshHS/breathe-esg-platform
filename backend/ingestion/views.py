import pandas as pd

from emissions.models import EmissionRecord
from .services import detect_suspicious
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import DataSource
from tenants.models import Organization

import pandas as pd

class UploadCSVView(APIView):

    def post(self, request):

        source_type = request.data.get("source_type")
        organization_id = request.data.get("organization_id")
        file = request.FILES.get("file")

        if not file:
            return Response(
                {"error": "No file uploaded"},
                status=status.HTTP_400_BAD_REQUEST
            )

        organization = Organization.objects.get(
            id=organization_id
        )

        datasource = DataSource.objects.create(
            organization=organization,
            source_type=source_type,
            uploaded_file=file
        )
        file.seek(0)
        df = pd.read_csv(file)

        records_created = 0

        for _, row in df.iterrows():

            if source_type == "sap":

                value = float(row["quantity"])

                EmissionRecord.objects.create(
                    organization=organization,
                    source=datasource,
                    category=row["fuel_type"],
                    scope="Scope 1",
                    activity_value=value,
                    original_unit=row["unit"],
                    normalized_value=value,
                    normalized_unit="L",
                    suspicious=detect_suspicious(
                        source_type,
                        value
                    )
                )

            elif source_type == "utility":

                value = float(row["kwh"])

                EmissionRecord.objects.create(
                    organization=organization,
                    source=datasource,
                    category="Electricity",
                    scope="Scope 2",
                    activity_value=value,
                    original_unit="kWh",
                    normalized_value=value,
                    normalized_unit="kWh",
                    suspicious=detect_suspicious(
                        source_type,
                        value
                    )
                )

            elif source_type == "travel":

                value = float(row["distance_km"])

                EmissionRecord.objects.create(
                    organization=organization,
                    source=datasource,
                    category=row["travel_type"],
                    scope="Scope 3",
                    activity_value=value,
                    original_unit="km",
                    normalized_value=value,
                    normalized_unit="km",
                    suspicious=detect_suspicious(
                        source_type,
                        value
                    )
                )

            records_created += 1

        return Response({
            "message": "Upload successful",
            "records_created": records_created
        })