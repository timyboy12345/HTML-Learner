import {defineStore} from 'pinia'

export const useContentStore = defineStore('content', {
    state: () => {
        return {
            modules: null as null | Module[],
        }
    },
    getters: {
        getModuleBySlug: (state) => {
            return (moduleSlug: string) => state.modules ? state.modules.find((m) => m.slug === moduleSlug) : null
        },
        getCourseBySlug: (state) => {
            return (moduleSlug: string, courseSlug: string) => {
                const module = state.modules ? state.modules.find((m) => m.slug === moduleSlug) : null;

                if (!module) throw new Error("Module not found");
                if (!module.courses) throw new Error("Module does not have courses yet");

                return module.courses.find((sc) => sc.slug === courseSlug)
            }
        },
        moduleExists: (state) => {
            return (moduleSlug: string) => state.modules
                ? state.modules.filter((m) => m.slug === moduleSlug).length > 0
                : null
        },
    },
})

export interface Module {
    name: string
    slug: string
    courses: Course[]
}

export interface Course {
    name: string
    slug: string
    slides: any[]
}
