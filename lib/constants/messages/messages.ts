//
// MESSAGE - is message
// ERROR/SUCCESS - message status
// ARTIST/USER, etc. - designation of the object to which the message relates (except global messages)
// CREATE/DONT_PERMISSION/, etc. - action or prohibition
//

// global messages
export const MESSAGE_ERROR_SOMETHING = "Произошла какая-то ошибка"
export const MESSAGE_ERROR_INVALID_UPLOAD = "Файл не загружен. Повторите попытку позже"
export const MESSAGE_ERROR_INVALID_CREATE_TRACK = "Произошла попытка при создании трека. Повторите попытку позже"

// files message
export const MESSAGE_ERROR_FILE_UPLOAD = "Не удалось загрузить изображение!"

// playlist messages
export const MESSAGE_ERROR_PLAYLIST_DONT_PERMISSION = "Вы не имеете разрешения на изменение контента плейлиста!"
export const MESSAGE_ERROR_PLAYLIST_CREATE = "Ошибка создания плейлиста. Повторите попытку позже!"

// user messages
export const MESSAGE_SUCCESS_USER_UPDATE_AVATAR = "Аватар обновлен!"
export const MESSAGE_SUCCESS_USER_UPDATE_NAME = "Имя обновлено!"
export const MESSAGE_ERROR_USER_UPDATE_ROW = "Не удалось обновить."

// artist messages
export const MESSAGE_SUCCESS_ARTIST_DELETE = "Артист был удален!"