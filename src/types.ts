// DND Types
export enum DNDTypes {
    FAVORITES = 'Favorites',
}

export interface DraggableEntity {
    id: string,
    type: DNDTypes,
}
