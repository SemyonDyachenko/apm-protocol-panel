import Tournament, { getTournamentLevel } from "@/models/Tournament"
import { competitorAPI } from "@/services/competitorService"
import NonImage from "/assets/utils/nonuserimage.jpg"
import { getCompetitorFullname } from "@/models/Competitor"
import League from "@/models/League"
import { Link } from "react-router-dom"

type Props = {
  tournament: Tournament
  league: League
}

const InformationWindow = ({ tournament, league }: Props) => {
  const { data: organizer } = competitorAPI.useFetchCompetitorDataQuery(
    tournament.organizer
  )
  const { data: judge } = competitorAPI.useFetchCompetitorDataQuery(
    tournament.main_referee
  )
  const { data: secretary } = competitorAPI.useFetchCompetitorDataQuery(
    tournament.main_secretary
  )

  return (
    <div className="flex items-start gap-12">
      <div>
        {tournament.afisha && (
          <img
            className="rounded-xl md:h-[350px] md:w-[300px]"
            src={tournament.afisha.toString()}
          />
        )}
      </div>
      <div className="w-full">
        <div className="flex w-full justify-end">
          <div>
            <Link
              className="text-sm text-secondary-500 underline transition hover:text-secondary-400"
              to={`https://apm-league.ru/tournament/editing/${tournament.id}/`}
            >
              Редактировать
            </Link>
          </div>
        </div>
        <div>
          <div className="mb-1 text-sm text-lightblue-200">Описание:</div>
          <div className="text-sm font-medium text-gray-600 ">
            {tournament.description}
          </div>
        </div>
        <div className="mt-8 grid w-full grid-cols-4 gap-12">
          <div>
            <div className="mb-1 text-sm text-lightblue-200">Организатор</div>
            <div className="text-sm font-medium text-gray-600">
              {organizer && (
                <Link
                  className="text-secondary-500 underline"
                  to={`https://apm-league.ru/competitor/${organizer.id}`}
                >
                  {getCompetitorFullname(organizer)}
                </Link>
              )}
            </div>
          </div>
          <div>
            <div className="mb-1 text-sm text-lightblue-200">Город</div>
            <div className="text-sm font-medium text-gray-600">
              {tournament.location}
            </div>
          </div>
          <div>
            <div className="mb-1 text-sm text-lightblue-200">Адрес</div>
            <div className="text-sm font-medium text-gray-600">
              {tournament.address}
            </div>
          </div>
          <div>
            <div className="mb-1 text-sm text-lightblue-200">Телефон</div>
            <div className="text-sm font-medium text-gray-600">
              {tournament.phone}
            </div>
          </div>
          <div>
            <div className="mb-1 text-sm text-lightblue-200">Уровень</div>
            <div className="text-sm font-medium text-gray-600">
              {getTournamentLevel(tournament)}
            </div>
          </div>
          <div>
            <div className="mb-1 text-sm text-lightblue-200">Лига</div>
            <div className="text-sm font-medium text-gray-600">
              {league.name}
            </div>
          </div>
          <div>
            <div className="mb-1 text-sm text-lightblue-200">Судья</div>
            <div className="text-sm font-medium text-gray-600">
              {judge && (
                <Link
                  className="text-secondary-500 underline"
                  to={`https://apm-league.ru/competitor/${judge.id}`}
                >
                  {getCompetitorFullname(judge)}
                </Link>
              )}
            </div>
          </div>
          <div>
            <div className="mb-1 text-sm text-lightblue-200">Секретарь</div>
            <div className="text-sm font-medium text-gray-600">
              {secretary && (
                <Link
                  className="text-secondary-500 underline"
                  to={`https://apm-league.ru/competitor/${secretary.id}`}
                >
                  {getCompetitorFullname(secretary)}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InformationWindow
