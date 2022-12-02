SELECT
    piece.id,
    box.name AS furniture_set,
    Slot.name AS slot,
    piece.name,
    piece.hasPictureAvailable as has_image,
    CONCAT_WS(
            "",
            Slot.filepath,
            ifnull(box.filenamePrefix, lower(replace(box.name, ' ', '_'))),
            piece.filenameAddition,
            Slot.filenameSuffix
        ) AS image_path
FROM
    `Furniture_piece` AS piece,
    Furniture_set AS box,
    Slot
WHERE
        box.id LIKE piece.furniture_set AND piece.slot LIKE Slot.id