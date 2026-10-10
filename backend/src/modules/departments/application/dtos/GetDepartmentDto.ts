export interface DepartmentDetailsResponseDto {
  id: string;
  name: string;
  code: string;
  description: string | null;
  managerId: string | null;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
}