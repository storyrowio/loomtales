import {Card, CardContent} from "@/components/ui/card.jsx";
import {HeartIcon, MessageSquareIcon, SendIcon, UserCircle2Icon, UserIcon} from "lucide-react";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel.jsx";

export default function ContentPreviewSection({ formik }) {
    const aspectRatio = 'aspect-4/5';

    return (
        <Card className="h-full flex items-center justify-center bg-slate-300">
            <Card className="w-[90%] lg:w-[50%] min-h-3/4 mx-auto">
                <CardContent>
                    <div className="mb-6 flex items-center gap-2">
                        <UserCircle2Icon className="size-5 text-slate-800"/>
                        <p className="text-xs">loomtales</p>
                    </div>
                    <Carousel>
                        <CarouselContent>
                            {formik.values.medias?.map((e, i) => (
                                <CarouselItem key={i}>
                                    <img
                                        alt="post-1"
                                        src={e?.url}
                                        className={`w-full ${aspectRatio} object-contain bg-gray-100 rounded-lg`}/>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                    <div className="mt-6 flex gap-2">
                        <HeartIcon className="size-5 text-slate-600"/>
                        <MessageSquareIcon className="size-5 text-slate-600"/>
                        <SendIcon className="size-5 text-slate-600"/>
                    </div>
                    <div className="mt-4">
                        <p className="text-xs">
                            <strong>loomtales</strong> Looking for a quick, healthy, and delicious breakfast? Try this super easy avocado toast! 😍

                            #HealthyEating #AvocadoToast #FoodLover #QuickBreakfast #Yummy
                            4o
                        </p>
                    </div>
                </CardContent>
            </Card>
        </Card>
    )
}
