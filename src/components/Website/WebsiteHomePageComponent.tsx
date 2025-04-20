
import HeroSliderSectionComponent from "./HeroSliderSectionComponent";
import { MigrantWorkersSectionComponent } from "./MigrantWorkersSectionComponent";
import WhoWeAreSectionComponent from "./WhoWeAreSectionComponent";

const WebsiteHomePageComponent = () => {

    return (
        <div className="mt-3">
            <HeroSliderSectionComponent/>
            <WhoWeAreSectionComponent/>
            <MigrantWorkersSectionComponent/>
        </div>
    );
}

export default WebsiteHomePageComponent;
