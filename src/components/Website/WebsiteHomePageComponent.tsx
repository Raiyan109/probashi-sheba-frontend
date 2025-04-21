
import HeroSliderSectionComponent from "./HeroSliderSectionComponent";
import { MigrantWorkersSectionComponent } from "./MigrantWorkersSectionComponent";
import RecruitFromBangladeshSectionComponent from "./RecruitFromBangladeshSectionComponent";
import WhoWeAreSectionComponent from "./WhoWeAreSectionComponent";

const WebsiteHomePageComponent = () => {

    return (
        <div className="mt-3">
            <HeroSliderSectionComponent/>
            <WhoWeAreSectionComponent/>
            <MigrantWorkersSectionComponent/>
            <RecruitFromBangladeshSectionComponent/>
        </div>
    );
}

export default WebsiteHomePageComponent;
