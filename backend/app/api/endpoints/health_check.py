from fastapi import APIRouter, Response, status


router = APIRouter()


@router.get("/hoge")
def health_check():
    return Response(status_code=status.HTTP_200_OK)
