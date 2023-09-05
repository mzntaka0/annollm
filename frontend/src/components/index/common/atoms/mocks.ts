import { atomWithStorage } from "jotai/utils";

import { FormType } from "components/index/AnnotationForm/validators";

export const mockAtom = atomWithStorage<(FormType & { id: string })[]>(
  "mocks",
  [
    {
      id: "0e0f6001-325b-4574-9311-dc428d34e0de",
      instruction:
        "あなたは優秀な法務スペシャリストです。次の文章がInputのチェック項目を満たしているか判定してください。",
      input: "- [ ] 反社条項が記載されているか",
      output: "- [x] 反射条項が記載されているか",
    },
  ],
);
