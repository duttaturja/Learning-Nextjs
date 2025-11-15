'use server';

import Event, { IEvent } from "@/database/event.model";
import connectDB from "@/lib/mongodb";

export const getSimilarEventsBySlug = async (slug: string) => {
    try{
        await connectDB();

        const event = await Event.findOne({ slug });
        const similarEvents = await Event.find({ _id: { $ne: event._id }, tags: { $in: event.tags } }).lean();
        return similarEvents.map(event => ({
            _id: event._id,
            title: event.title,
            slug: event.slug,
            description: event.description,
            overview: event.overview,
            // Add other fields from IEvent as necessary
        })) as IEvent[];
    } catch {
        return [];
    }
};