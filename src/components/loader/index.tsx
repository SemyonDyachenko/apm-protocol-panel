import { ColorRing } from "react-loader-spinner"

type Props = {}

const Loader = (props: Props) => {
  return (
    <div className="flex items-center justify-center p-40">
      <ColorRing
        visible={true}
        height="120"
        width="120"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#FFC132", "#FFC132", "#FFC132", "#FFC132", "#FFC132"]}
      />
    </div>
  )
}

export default Loader
