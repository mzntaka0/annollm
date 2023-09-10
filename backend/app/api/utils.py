from typing import Type

from pydantic import BaseModel
from pydantic.schema import model_schema


def example_response(model: Type['BaseModel']):
    _schema = model_schema(model)

    def first_enum_(value):
        # TODO: this implementation may be not good
        example = value.get('default', value.get('type', value))
        if isinstance(example, dict):
            example = _schema[example.get('allOf', '')[0]['$ref'].split('/')[1]][example.get('allOf', '')[0]['$ref'].split('/')[2]]['enum'][0]
        return example

    return {
        key: value.get('default', value.get('type', first_enum_(value))) for key, value in _schema['properties'].items()
    }
