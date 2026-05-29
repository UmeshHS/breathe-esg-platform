def detect_suspicious(
    source_type,
    value
):

    if source_type == "sap":
        return value > 10000

    if source_type == "utility":
        return value < 0

    if source_type == "travel":
        return value > 20000

    return False