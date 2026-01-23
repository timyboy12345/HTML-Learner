import {defineStore} from 'pinia'

export const useContentStore = defineStore('content', {
    state: () => {
        return {
            modules: null as null | Module[],
            progress: null as null | any[],
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
        courseState: (state) => {
            return (courseId: string) => {
                const progress = (state.progress ?? []).find((p) => p.course === courseId);

                if (!progress) {
                    return false
                }

                return progress.state;
            }
        }
    },
})

export interface Module {
    id: string
    name: string
    description: string
    slug: string
    courses: Course[]
}

export interface Course {
    id: string
    name: string
    slug: string
    slides: any[]
}
