import { Request, Response } from 'express';
import {
  leadService,
  CreateLeadSchema,
  UpdateLeadSchema,
  ChangeLeadStatusSchema,
  AddLeadNoteSchema,
  AddLeadActivitySchema,
  ListLeadsQuerySchema,
} from '../services/lead.service';

// Helper to get tenantId and userId from request safely
const getContext = (req: Request) => ({
  tenantId: req.tenantId as string,
  userId: req.user?.userId as string,
});

// GET /api/cms/leads
export const listLeads = async (req: Request, res: Response) => {
  try {
    const { tenantId } = getContext(req);
    const query = ListLeadsQuerySchema.parse(req.query);
    const result = await leadService.listLeads(tenantId, query);
    res.json({ success: true, ...result });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// GET /api/cms/leads/kanban
export const getKanbanSummary = async (req: Request, res: Response) => {
  try {
    const { tenantId } = getContext(req);
    const data = await leadService.getKanbanSummary(tenantId);
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/cms/leads/:id
export const getLeadById = async (req: Request, res: Response) => {
  try {
    const { tenantId } = getContext(req);
    const lead = await leadService.getLeadById(tenantId, req.params.id);
    res.json({ success: true, data: lead });
  } catch (err: any) {
    const status = err.message === 'LEAD_NOT_FOUND' ? 404 : 500;
    res.status(status).json({ success: false, message: err.message });
  }
};

// POST /api/cms/leads
export const createLead = async (req: Request, res: Response) => {
  try {
    const { tenantId, userId } = getContext(req);
    const data = CreateLeadSchema.parse(req.body);
    const lead = await leadService.createLead(tenantId, data, userId);
    res.status(201).json({ success: true, data: lead });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// PUT /api/cms/leads/:id
export const updateLead = async (req: Request, res: Response) => {
  try {
    const { tenantId } = getContext(req);
    const data = UpdateLeadSchema.parse(req.body);
    const lead = await leadService.updateLead(tenantId, req.params.id, data);
    res.json({ success: true, data: lead });
  } catch (err: any) {
    const status = err.message === 'LEAD_NOT_FOUND' ? 404 : 400;
    res.status(status).json({ success: false, message: err.message });
  }
};

// PATCH /api/cms/leads/:id/status
export const changeLeadStatus = async (req: Request, res: Response) => {
  try {
    const { tenantId, userId } = getContext(req);
    const data = ChangeLeadStatusSchema.parse(req.body);
    const lead = await leadService.changeStatus(tenantId, req.params.id, data, userId);
    res.json({ success: true, data: lead });
  } catch (err: any) {
    const status = err.message === 'LEAD_NOT_FOUND' ? 404 : 400;
    res.status(status).json({ success: false, message: err.message });
  }
};

// POST /api/cms/leads/:id/notes
export const addLeadNote = async (req: Request, res: Response) => {
  try {
    const { tenantId, userId } = getContext(req);
    const data = AddLeadNoteSchema.parse(req.body);
    const note = await leadService.addNote(tenantId, req.params.id, data, userId);
    res.status(201).json({ success: true, data: note });
  } catch (err: any) {
    const status = err.message === 'LEAD_NOT_FOUND' ? 404 : 400;
    res.status(status).json({ success: false, message: err.message });
  }
};

// POST /api/cms/leads/:id/activities
export const addLeadActivity = async (req: Request, res: Response) => {
  try {
    const { tenantId, userId } = getContext(req);
    const data = AddLeadActivitySchema.parse(req.body);
    const activity = await leadService.addActivity(tenantId, req.params.id, data, userId);
    res.status(201).json({ success: true, data: activity });
  } catch (err: any) {
    const status = err.message === 'LEAD_NOT_FOUND' ? 404 : 400;
    res.status(status).json({ success: false, message: err.message });
  }
};

// DELETE /api/cms/leads/:id
export const deleteLead = async (req: Request, res: Response) => {
  try {
    const { tenantId } = getContext(req);
    await leadService.deleteLead(tenantId, req.params.id);
    res.json({ success: true, message: 'Lead deleted successfully' });
  } catch (err: any) {
    const status = err.message === 'LEAD_NOT_FOUND' ? 404 : 500;
    res.status(status).json({ success: false, message: err.message });
  }
};

