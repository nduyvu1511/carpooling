import { Star } from "@/components/star"
import { useFetchRatingTags } from "@/hooks"
import { CreateRatingFormParams, RatingRangePost, RatingRes } from "@/models"
import { useState } from "react"
import { Spinner } from "../loading"
import { TagItem } from "../common"

interface RatingFormProps {
  onSubmit?: (params: CreateRatingFormParams) => void
  defaultValue?: RatingRes
  mode?: "create" | "update"
}

export const RatingForm = ({ onSubmit, defaultValue, mode = "create" }: RatingFormProps) => {
  const [value, setValue] = useState(defaultValue?.rating_content || "")
  const [tagsSelect, setTagsSelect] = useState<number[]>(
    defaultValue?.rating_tag_ids?.map((item) => item.tag_id) || []
  )
  const [ratingNumber, setRatingNumber] = useState<RatingRangePost>(
    defaultValue?.rating_number || 5
  )
  const { ratingTags, isValidating } = useFetchRatingTags(ratingNumber)

  const handleSubmit = () => {
    if (!value || !ratingNumber) return

    onSubmit &&
      onSubmit({
        rating_content: value,
        rating_number: ratingNumber,
        rating_tag_ids: tagsSelect,
      })
  }

  const handleToggleTagInTagsSelect = (id: number) => {
    if (tagsSelect?.includes(id)) {
      setTagsSelect((prev) => [...prev].filter((item) => item !== id))
    } else {
      setTagsSelect((prev) => [...prev, id])
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto scrollbar-hide pb-[50px]">
        <div className="flex-center mb-[24px]">
          <Star
            initialValue={(defaultValue?.rating_number || 0) * 20}
            onClick={(val) => {
              setRatingNumber((val / 20) as RatingRangePost)
              setTagsSelect([])
            }}
            ratingValue={ratingNumber * 20}
            size={34}
          />
        </div>

        <div className="mt-[24px] mb-[40px]">
          {isValidating ? (
            <Spinner size={30} className="py-[20px]" />
          ) : ratingTags?.length > 0 ? (
            <ul className="flex flex-wrap justify-center">
              {ratingTags.map((item, index) => (
                <li key={index} className="mr-[8px] mb-[12px]">
                  <TagItem
                    className="cursor-pointer"
                    label={item.tag_content}
                    onChange={() => handleToggleTagInTagsSelect(item.tag_id)}
                    isActive={tagsSelect?.includes(item.tag_id)}
                  />
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="mb-[40px]">
          <textarea
            className="form-textarea"
            placeholder="Nhập nội dung đánh giá..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
            rows={5}
          ></textarea>
        </div>
      </div>

      <div className="flex-center absolute p-custom left-0 right-0 bottom-0 bg-white-color">
        <button onClick={handleSubmit} className={`btn-primary ${!value ? "btn-disabled" : ""}`}>
          Gửi
        </button>
      </div>
    </div>
  )
}
