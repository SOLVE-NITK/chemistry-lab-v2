export function animateAppear(object) {

    // Save the current scale before shrinking
    const finalScale = object.scale.clone();

    // Start from tiny scale
    object.scale.set(0.01, 0.01, 0.01);

    let progress = 0;

    function grow(){

        progress += 0.08;

        object.scale.set(
            finalScale.x * progress,
            finalScale.y * progress,
            finalScale.z * progress
        );

        if(progress < 1){

            requestAnimationFrame(grow);

        } else {

            object.scale.copy(finalScale);

        }

    }

    grow();

}