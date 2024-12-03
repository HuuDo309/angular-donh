import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MappingService {
  categoryMap: Map<number, string> = new Map([
    [0, 'Thời sự'],
    [1, 'Thế giới'],
    [2, 'Kinh doanh'],
    [3, 'Giải trí'],
    [4, 'Thể thao'],
    [5, 'Pháp luật'],
    [6, 'Giáo dục'],
    [7, 'Sức khỏe'],
    [8, 'Gia đình'],
    [9, 'Du lịch'],
    [10, 'Khoa học'],
    [11, 'Số hóa'],
    [12, 'Giao thông'],
  ]);
  

  publicMap: Map<boolean, string> = new Map([
    [true, "Yes"],
    [false, "No"],
  ]);

  positionMap: Map<number, string> = new Map([
    [1, 'Việt Nam'],
    [2, 'Châu Á'],
    [3, 'Châu Âu'],
    [4, 'Châu Mỹ'],
  ]);
  

  getCategoryName(category: any): string {
    const categoryId = Number(category); 
    return this.categoryMap.get(categoryId) || 'Không xác định';
  }

  getCategories(): { value: number, label: string }[] {
    const categories: { value: number, label: string }[] = [];
    this.categoryMap.forEach((label, value) => {
      categories.push({ value, label });
    });
    return categories;
  }

  getPublicStatus(isPublic: boolean): string {
    return this.publicMap.get(isPublic) || "Không xác định";
  }

  getPositionNames(position: number[]): string[] {
    if (!Array.isArray(position)) {
        console.error("Dữ liệu không hợp lệ: position phải là một mảng.");
        return [];
    }
    return position.map(id => this.positionMap.get(id) || 'Không xác định');
}

  getPositions(): { value: number, label: string }[] {
    const positions: { value: number, label: string }[] = [];
    this.positionMap.forEach((label, value) => {
      positions.push({ value, label });
    });
    return positions;
  }
  
  constructor() { }
}
