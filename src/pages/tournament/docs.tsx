type Props = {}

const TournamentDocsPage = (props: Props) => {
  return (
    <div>
      <div className="flex gap-x-4">
        <div className="h-[200px] cursor-pointer rounded-2xl bg-gray-70 py-10 transition hover:bg-gray-200 md:w-[180px]">
          <div className="flex w-full justify-center">
            <img
              className="w-[85px] opacity-50 "
              src="/assets/utils/docs.png"
            />
          </div>
          <div className="mt-6 flex w-full justify-center text-lg font-bold uppercase text-gray-600">
            Правила
          </div>
        </div>
      </div>
    </div>
  )
}

export default TournamentDocsPage
