import { Subjects,Publisher,ExpirationCompleteEvent } from "@hellotickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
    subject:Subjects.ExpirationComplete=Subjects.ExpirationComplete;
}