import { InputImage } from "@/components"
import { ImageRes } from "@/models"
import { Control, useController } from "react-hook-form"

interface MultipleImageFieldProps {
  control: Control<any>
  name: string
  className?: string
}

export const MultipleImageField = ({ control, name, className }: MultipleImageFieldProps) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  })

  const handleAddImage = (val: ImageRes) => {
    const images: ImageRes[] = value || []
    onChange([...images, val])
  }

  const handleDeleteImage = (id: number) => {
    const images: ImageRes[] = value || []
    onChange([...images].filter((item) => item.id !== id))
  }

  return (
    <div
      ref={ref}
      onBlur={onBlur}
      className={`flex flex-center justify-start flex-wrap ${className}`}
    >
      {value?.map((item: ImageRes) => (
        <div key={item.id} className="mr-12 mb-12">
          <InputImage
            onDelete={() => handleDeleteImage(item.id)}
            readOnly
            id={item.id + ""}
            image={item.url}
          />
        </div>
      ))}

      <InputImage
        key={"add"}
        id={"add"}
        getImage={(img) => handleAddImage({ id: img.attachment_id, url: img.attachment_url })}
      />
    </div>
  )
}
