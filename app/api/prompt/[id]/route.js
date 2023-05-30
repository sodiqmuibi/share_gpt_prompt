import { connectToDb } from "@/utils/database"
import Prompt from "@/models/prompt"

export const GET = async (req, {params}) => {
    try {
        await connectToDb()
        const prompts = await Prompt.findById(params.id).populate('creator')
        if (!prompts) return new Response("Prompt not found", {status: 404})
        return new Response(JSON.stringify(prompts), {status: 201})
    }catch (error) {
        return new Response("Failed to fetch prompts", {status: 500})
    }
}

export const PATCH = async (req, {params}) => {
    const {prompt, tag} = await req.json()
    try {
        await connectToDb()
        const existingPrompt = await Prompt.findById(params.id)
        if (!existingPrompt) return new Response("Prompt not found", {status: 404})
        existingPrompt.prompt = prompt
        existingPrompt.tag = tag
        await existingPrompt.save()
        return new Response(JSON.stringify(existingPrompt), {status: 201})
    } catch (error) {
        return new Response("Failed to update prompt")
    }
}

export const DELETE = async (req, {params}) => {
    try {
        await connectToDb()
        await Prompt.findByIdAndDelete(params.id)
        return new Response("Prompt deleted successfully", {status: 201})
    } catch {
        return new Response("Failed to delete prompt")
    }
}