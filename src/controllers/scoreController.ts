import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Score, BehaviorLevel } from "../database/entities/Score";
import { Children } from "../database/entities/Children";

export class ScoreController {
    // Crear un nuevo registro
    async createScore(req: Request, res: Response) {
        try {
            const {
                childId,
                toy,
                points,
                classification,
                photo,
                generosity,
                kindness,
                respect,
                obedience,
                responsibility,
            } = req.body;

            const scoreRepository = getRepository(Score);
            const childRepository = getRepository(Children);

            // Verificar que el niño exista
            const child = await childRepository.findOne(childId);
            if (!child) {
                return res.status(404).json({ message: "Niño no encontrado" });
            }

            // Crear el nuevo registro de Score
            const newScore = new Score();
            newScore.child = child;
            newScore.toy = toy;
            newScore.points = points;
            newScore.classification = classification;
            newScore.photo = photo;

            // Asignar comportamientos con validación de enums
            newScore.generosity = generosity || BehaviorLevel.REGULAR;
            newScore.kindness = kindness || BehaviorLevel.REGULAR;
            newScore.respect = respect || BehaviorLevel.REGULAR;
            newScore.obedience = obedience || BehaviorLevel.REGULAR;
            newScore.responsibility = responsibility || BehaviorLevel.REGULAR;

            await scoreRepository.save(newScore);
            return res.status(201).json(newScore);
        } catch (error) {
            return res.status(500).json({ message: "Error al crear el puntaje", error });
        }
    }

    // Obtener todos los registros
    async getAllScores(req: Request, res: Response) {
        try {
            const scoreRepository = getRepository(Score);
            const scores = await scoreRepository.find({ relations: ["child"] });
            return res.json(scores);
        } catch (error) {
            return res.status(500).json({ message: "Error al obtener los puntajes", error });
        }
    }

    // Obtener un registro por ID
    async getScoreById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const scoreRepository = getRepository(Score);

            const score = await scoreRepository.findOne({
                where: { id: parseInt(id) },
                relations: ["child"],
            });

            if (!score) return res.status(404).json({ message: "Puntaje no encontrado" });

            return res.json(score);
        } catch (error) {
            return res.status(500).json({ message: "Error al obtener el puntaje", error });
        }
    }

    // Actualizar un registro
    async updateScore(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const {
                toy,
                points,
                classification,
                photo,
                generosity,
                kindness,
                respect,
                obedience,
                responsibility,
            } = req.body;

            const scoreRepository = getRepository(Score);

            const score = await scoreRepository.findOne({
                where: { id: parseInt(id) },
                relations: ["child"],
            });

            if (!score) return res.status(404).json({ message: "Puntaje no encontrado" });

            // Actualizar valores solo si se proporcionan
            if (toy) score.toy = toy;
            if (points) score.points = points;
            if (classification) score.classification = classification;
            if (photo) score.photo = photo;

            // Validar y actualizar comportamientos
            if (generosity) score.generosity = generosity;
            if (kindness) score.kindness = kindness;
            if (respect) score.respect = respect;
            if (obedience) score.obedience = obedience;
            if (responsibility) score.responsibility = responsibility;

            await scoreRepository.save(score);
            return res.json(score);
        } catch (error) {
            return res.status(500).json({ message: "Error al actualizar el puntaje", error });
        }
    }

    // Eliminar un registro
    async deleteScore(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const scoreRepository = getRepository(Score);

            const score = await scoreRepository.findOne({ where: { id: parseInt(id) } });

            if (!score) return res.status(404).json({ message: "Puntaje no encontrado" });

            await scoreRepository.remove(score);
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ message: "Error al eliminar el puntaje", error });
        }
    }
}
